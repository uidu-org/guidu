import Button from '@uidu/button';
import React, { Fragment } from 'react';
import { GitHub, Package } from 'react-feather';

export type MetaDataProps = {
  packageSrc: string;
  packageName: string;
};

export default class MetaData extends React.Component<MetaDataProps> {
  render() {
    const { packageSrc, packageName } = this.props;

    return (
      <Fragment>
        <Button
          href={`https://www.npmjs.com/package/${packageName}`}
          label="npm"
          summary={packageName}
          iconBefore={<Package size={16} />}
          target="_blank"
        />
        <Button
          href={packageSrc}
          label="Source"
          summary="Github"
          iconBefore={<GitHub size={16} />}
          target="_blank"
        />
      </Fragment>
    );
  }
}
