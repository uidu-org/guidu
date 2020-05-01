import React, { PureComponent } from 'react';
import Loader from '../../Loader';
import Items from './Items';

export default class ListBlock extends PureComponent<any> {
  render() {
    const { formatter, datumRenderer, resultSet } = this.props;

    if (!resultSet) {
      return <Loader />;
    }

    return (
      <>
        {/* <div className="card-header d-flex align-items-center">
          <span className="text-truncate">{label}</span>
          {comparatorData && (
            <Switch
              isPrevious={showPrevious}
              comparatorData={comparatorData}
              onChange={e =>
                this.setState(prevState => ({
                  showPrevious: !prevState.showPrevious,
                }))
              }
              range={
                comparatorData && showPrevious
                  ? timeRange.previousRange
                  : timeRange.range
              }
            />
          )}
        </div> */}
        <Items
          resultSet={resultSet}
          tableColumns={resultSet.tableColumns()}
          data={resultSet.loadResponse.data}
          datumRenderer={datumRenderer}
          formatter={formatter}
        />
      </>
    );
  }
}
