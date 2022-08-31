import {
  FieldValues,
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
} from 'react-hook-form';

export { useForm, useFormState, useFieldArray, useWatch };

type ObjPrimitiveValue = string | number | boolean | null | object;
type ObjValue = ObjPrimitiveValue | ObjPrimitiveValue[];

interface ObjTransformers {
  keys?: (key: string, level: number) => string;
  values?: (value: ObjValue, level: number) => any;
}

export function transformObj<T extends FieldValues>(
  obj: T,
  transforms: ObjTransformers = {},
  level = 0,
): T {
  if (typeof obj !== 'object' || obj === null) {
    // nothing we can do
    return obj;
  }

  function convertValue(value: ObjValue): ObjValue {
    if (Array.isArray(value)) {
      return value.map(convertValue);
    }
    if (typeof value === 'object') {
      return transformObj(value, transforms, level + 1);
    }
    if (transforms.values) {
      // transform value
      return transforms.values(value, level);
    }
    return value;
  }

  return Object.keys(obj).reduce(
    (result, key) => ({
      ...result,
      [transforms.keys ? transforms.keys(key, level) : key]: convertValue(
        obj[key],
      ),
    }),
    {} as T,
  );
}

export function stripEmpty<T extends FieldValues>(model: T) {
  return transformObj<T>(model, {
    values: (value) => {
      if (!value || value === '') {
        return null;
      }
      return value;
    },
  });
}
