import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  ProfileHeader,
  ProfileSelectorButton,
  ProfileDetailsRenderer,
} from '../../components';
import {color, dimension} from '../../utility';
import {getUserName, getUsers} from '../../Api/PersonalInformationProfile';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalInformationProfileScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [selectedProfileType, setSelectedProfileType] = useState(1);
  const [basicdetail1, setbasicdetail1] = useState([]);
  const [basicdetail2, setbasicdetail2] = useState([]);
  const [professionaldata, setProfessionalData] = useState([]);
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');


  useEffect(() => {
    getData();
  }, [selectedProfileType]);

  async function getData() {
    setLoading(true);
    const phone = await AsyncStorage.getItem('phone');
    console.log("phonephonephone",phone);
    setPhone(phone)
    getUsers()
      .then(res => {
        console.log('res :>> getUsers', res);

        setLoading(false);
        console.log(JSON.stringify(res?.data));
        setbasicdetail1(res?.data?.details?.basic_detail_one);
        setbasicdetail2(res?.data?.details?.basic_detail_two);
        setProfessionalData(res?.data?.details?.professional_info);
      })
      .catch(error => {
        setLoading(false);
        console.log('error --------------:>> ', error);
      });

    getUserName()
      .then(res => {
        setUsername(res?.data?.user);
        console.log('res :>> getUserName', res);
      })
      .catch(error => {
        console.log('error :>> ', error);
      });
  }

  // console.log(
  //   'professionaldata :>> ',
  //   JSON.stringify(professionaldata, null, 2),
  // );

  const profileSelectorData = [
    {
      id: 1,
      label: textStorage['PersonalInformationProfileScreen.personal'],
    },
    {
      id: 2,
      label: textStorage['PersonalInformationProfileScreen.professional'],
    },
  ];

  const personalInfoData = [
    {
      id: 1,
      label: textStorage['BasicdetailsScreen.full_name'],
      value: basicdetail1?.profile_name,
    },
    {
      id: 2,
      label: textStorage['BasicdetailsScreen.email'],
      value: basicdetail1?.email,
    },
    {
      id: 3,
      label: textStorage['BasicdetailsScreen.gender'],
      value: basicdetail1?.gender?.name,
    },
    {
      id: 4,
      label: textStorage['BasicdetailsScreen.date_of_birth'],
      value: basicdetail1?.dob,
    },
    {
      id: 5,
      label: textStorage['PersonalInformationScreen.marital_status'],
      value: basicdetail2?.marital_status,
    },
    {
      id: 6,
      label: textStorage['PersonalInformationScreen.i_stay_in'],
      value: basicdetail2?.stay_in,
    },
    {
      id: 7,
      label: textStorage['PersonalInformationScreen.education_qualification'],
      value: basicdetail2?.educational_qualification?.name,
    },
    {
      id: 8,
      label:
        textStorage['PersonalInformationScreen.language_preference_calling'],
      value: basicdetail2?.language_preference?.name,
    },
    {
      id: 9,
      label: textStorage['PersonalInformationScreen.current_address'],
      value: basicdetail1?.address,
    },
  ];

  const professionalInfoData = [
    {
      id: 1,
      label: textStorage['BasicdetailsScreen.monthly_income'],
      value: formatWithCommas(parseInt(professionaldata?.monthly_income)),
    },
    {
      id: 2,
      label: textStorage['ProfessionalInformationScreen.mode_salary'],
      value: professionaldata?.salary_receipt?.name,
    },
    {
      id: 3,
      label: textStorage['BasicdetailsScreen.employment_type'],
      value: professionaldata?.employment_type?.name,
    },
    {
      id: 4,
      label: textStorage['ProfessionalInformationScreen.company_name'],
      value: professionaldata?.company?.name,
    },
    {
      id: 5,
      label: textStorage['ProfessionalInformationScreen.industry_type'],
      value: professionaldata?.industry_type?.name,
    },
    {
      id: 6,
      label: textStorage['ProfessionalInformationScreen.company_address'],
      value: professionaldata?.address,
    },
  ];

  function formatWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+\b)/g, ',');
  }

  return (
    <>
      {loading ? (
        <ActivityIndicator color={'black'} size={'large'} />
      ) : (
        <View style={styles.containerStyle}>
          <ProfileHeader
            data={{name : basicdetail1?.profile_name, phone}}
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
            textStorage={textStorage}
            notificationOnPress={() =>
              navigation.navigate('NotificationTopTabNavigator')
            }
            backOnPress={() => navigation.goBack()}
          />
          <View style={styles.baseContainerStyle}>
            <FlatList
              data={profileSelectorData}
              horizontal
              style={styles.flatlistStyle}
              contentContainerStyle={styles.flatlistContentContainerStyle}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <ProfileSelectorButton
                      label={item.label}
                      onPress={() => setSelectedProfileType(item.id)}
                      selected={item.id === selectedProfileType ? true : false}
                    />
                  </View>
                );
              }}
            />
            <ProfileDetailsRenderer
              type={selectedProfileType}
              personalInformationData={personalInfoData}
              professionalInformationData={professionalInfoData}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  flatlistStyle: {
    width: dimension.width * 0.7,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  flatlistContentContainerStyle: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: '30%',
  },
  baseContainerStyle: {
    paddingHorizontal: 20,
  },
});

export {PersonalInformationProfileScreen};
