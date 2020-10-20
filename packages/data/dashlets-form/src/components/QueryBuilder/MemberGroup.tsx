import Select from '@uidu/select';
import React from 'react';

export default function MemberGroup({
  members,
  name,
  availableMembers,
  addMemberName,
  updateMethods,
  updateQuery,
  title,
}) {
  return (
    <>
      <Select
        rowClassName="mb-0"
        label={title}
        name={name}
        // value={members}
        options={availableMembers}
        getOptionLabel={({ title }) => title}
        getOptionValue={({ name }) => name}
        onChange={(
          name,
          value,
          { actionMeta: { action, option, removedValue } },
        ) => {
          return updateQuery({
            [name]: value === '' ? [] : value,
          });
          //   console.log(option);
          //   switch (action) {
          //     case 'select-option':
          //       updateMethods.add(option);
          //       break;
          //     case 'remove-value':
          //       updateMethods.remove(removedValue);
          //       break;
          //   }
          // }}
        }}
        multiple
      />
    </>
  );
}
