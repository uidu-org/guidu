import { code, Example, md, Prop, Props } from '@uidu/docs';
import React from 'react';

export default md`
  \`AvatarGroup\` is a wrapper around avatars designed to render a collection
  of avatars. You will want to use avatar group when you want to stack avatars,
  or have easy collapse states once a set number of avatars are used, including a
  dropdown to show hidden avatars.

  \`AvatarGroup\` takes in a data array. Each object in the array will be turned into
  an \`Avatar\`, with the properties of the object being spread onto an avatar. While
  doing this it is important to remember to include a \`key\` property. For other data,
  see [The avatar documentation](./avatar) for the properties \`Avatar\` accepts.

  ### The Four Exceptions

  There are four props of \`Avatar\` that \`AvatarGroup\` can or will override:

  - \`onAvatarClick\` will be passed to \`onClick\` unless there is an explicit \`onClick\` on the avatar object
  - \`borderColor\` will get the \`AvatarGroup\`'s \`borderColor\`
  - \`size\` will get the \`AvatarGroup\`'s \`size\`
  - \`groupAppearance\` will get the \`AvatarGroup\`'s \`appearance\`

  ## Usage

  ${code`import AvatarGroup from '@uidu/avatar-group';`}

${(
  <Example
    packageName="@uidu/avatar-group"
    Component={require('../examples/02-basicAvatarGroup').default}
    title="AvatarGroup"
    source={require('!!raw-loader!../examples/02-basicAvatarGroup')}
  />
)}

${(
  <Props
    heading="Avatar Group Props"
    props={require('!!extract-react-types-loader!../src/components/AvatarGroup')}
    overrides={{
      // @ts-ignore
      data: props => {
        if (
          props &&
          props.typeValue &&
          props.typeValue.typeParams &&
          props.typeValue.typeParams.params
        ) {
          props.typeValue.typeParams.params = [
            { kind: 'id', name: '@uidu/avatar props' },
          ];
        }

        return <Prop {...props} interface="Array<@uidu/avatar props>" />;
      },
      // @ts-ignore
      avatar: props => {
        // Currently pretty-propinterfaces does not have a good print interface for function
        // calls, so we are overriding how this is printed. AK-5133 should resolve
        // this.
        if (
          props &&
          props.typeValue &&
          props.typeValue.typeParams &&
          props.typeValue.typeParams.params
        ) {
          props.typeValue.typeParams.params = [
            { kind: 'id', name: '@uidu/avatar' },
          ];
        }

        return <Prop {...props} defaultValue="@uidu/avatar" />;
      },
    }}
  />
)}
`;
