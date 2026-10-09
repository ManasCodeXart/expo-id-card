import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HangingCard } from '../components/HangingCard';

const Index = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <HangingCard
        name="Manas Sharma"
        role="Mobile design engineer"
        phone="+91 987654321"
        email="sharmajimanas@gmail.com"
        avatarSource={require('../../assets/images/profile.png')}
        qrCodeSource={require('../../assets/images/Qrcode.png')}
        backLogoSource={require('../../assets/images/zayx.png')}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
