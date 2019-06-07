import React, { PureComponent } from 'react';
import {
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { colors } from '../../utils';
import Loader from '../Loader';

const data01 = [
  {
    value: 100,
    name: '展现',
    fill: colors[0],
  },
  {
    value: 80,
    name: '点击',
    fill: colors[1],
  },
  {
    value: 50,
    name: '访问',
    fill: colors[2],
  },
  {
    value: 40,
    name: '咨询',
    fill: colors[3],
  },
  {
    value: 26,
    name: '订单',
    fill: colors[4],
  },
];

export default class PieBlock extends PureComponent<any> {
  render() {
    const { rowData, loaded } = this.props;

    if (!loaded) {
      return <Loader />;
    }

    return (
      <div className="card h-100">
        <div className="card-header">Graph title</div>
        <div className="card-body">
          <ResponsiveContainer>
            <FunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={data01} isAnimationActive>
                <LabelList
                  position="right"
                  fill="#000"
                  stroke="none"
                  dataKey="name"
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
