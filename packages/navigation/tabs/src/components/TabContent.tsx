import React from 'react';
import { TabPane } from '../styled';
import { TabContentComponentProvided } from '../types';


export default function TabContent({
  data = {},
  elementProps = {}
}: TabContentComponentProvided) {
  return <TabPane {...elementProps}>{data.content}</TabPane>;
}


