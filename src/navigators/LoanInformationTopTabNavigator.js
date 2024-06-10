import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {KeyFactsStatementScreen, RepaymentScheduleScreen} from '../Screens';
import {DontHavePANCustomTopTabBar} from '../components';
import {AppStateContext} from '../providers/AuthContextProvider';

const Tab = createMaterialTopTabNavigator();

const LoanInformationTopTabNavigator = ({route}) => {
  const {textStorage} = useContext(AppStateContext);
  // alert(JSON.stringify(route.params.data.id))
  global.ID=route.params.data.id
  // console.log('textStorage :>> ', JSON.stringify(textStorage, null, 2));
  return (
    <Tab.Navigator
      tabBar={props => (
        <DontHavePANCustomTopTabBar
          headerLabel={
            textStorage['LoanInformationTopTabNavigator.loan_information']
          }
          {...props}
        />
      )}>
      <Tab.Screen
        options={{
          tabBarLabel:
            textStorage['LoanInformationTopTabNavigator.key_facts_statement'],
        }}
        name={'KeyFactsStatementScreen'}
        component={KeyFactsStatementScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel:
            textStorage['LoanInformationTopTabNavigator.repayment_schedule'],
        }}
        name={'RepaymentScheduleScreen'}
        component={RepaymentScheduleScreen}
      />
    </Tab.Navigator>
  );
};

export default LoanInformationTopTabNavigator;
