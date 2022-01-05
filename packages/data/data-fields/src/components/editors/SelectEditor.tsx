import Form from '@uidu/form';
import { CustomItem, MenuGroup, Section } from '@uidu/menu';
import Select from '@uidu/select';
import React, { useRef } from 'react';

export default function SelectEditor(params) {
  const select = useRef(null);
  const { value, onChange, option: Option } = params;

  const { column, options, node, multiple } = params;

  return (
    <MenuGroup>
      <Section>
        {options.map((option) => (
          <CustomItem
            component={(componentProps) => (
              <>
                <button
                  {...componentProps}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onChange(option.id);
                  }}
                >
                  <Option value={option} />
                </button>
              </>
            )}
          />
        ))}
      </Section>
    </MenuGroup>
  );

  return (
    <div
      // ref="container"
      tabIndex={1} // important - without this the keypresses wont be caught
      style={{
        width: column.width - 2,
        lineHeight: 'initial',
      }}
    >
      <Form
        handleSubmit={async (model) => console.log(model)}
        footerRenderer={() => {}}
      >
        <Select
          multiple={multiple}
          componentRef={select}
          layout="elementOnly"
          name="value"
          options={options}
          menuPortalTarget={document.body}
          // isSearchable
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            control: (base) => ({
              ...base,
              // height: node.rowHeight - 3,
            }),
          }}
          value={value}
          onChange={onChange}
          menuIsOpen={true}
          // menuShouldBlockScroll
        />
      </Form>
    </div>
  );
}
