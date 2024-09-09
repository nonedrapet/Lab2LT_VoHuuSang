import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  Alert, // Import Alert to show messages
} from 'react-native';

const App = () => {
  // State to manage orientation and input text
  const [orientation, setOrientation] = useState('portrait');
  const [inputText, setInputText] = useState(''); // State to store input text
  const { width, height } = useWindowDimensions();

  // Detect screen orientation change
  useEffect(() => {
    const updateLayout = () => {
      setOrientation(height > width ? 'portrait' : 'landscape');
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);

    // Initial layout check
    updateLayout();

    // Clean up listener when component unmounts
    return () => {
      subscription?.remove();
    };
  }, [width, height]);

  // Get screen width for dynamic width adjustment
  const screenWidth = width;

  // Function to handle button 1 click
  const handleButton1Click = () => {
    Alert.alert('Thông báo', `Đây là: ${inputText}`);
  };

  // Function to handle button 2 click
  const handleButton2Click = () => {
    Alert.alert('Thông báo', 'Không có gì xảy ra');
  };

  return (
    <>
      {/* Status bar customization based on platform */}
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
        backgroundColor={Platform.OS === 'android' ? '#000' : undefined}
      />

      {/* Main container with ScrollView for landscape mode */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {orientation === 'portrait' ? (
          // In portrait mode, display normally without scroll
          <>
            {/* Dynamic image scaling based on screen width */}
            <Image
              source={{ uri: 'https://media.vneconomy.vn/w800/images/upload/2021/04/20/thanh-pho-thu-dau-motbinh-duong-1512567475796-4-15-419-754-crop-1512567765603.jpg' }}
              style={{
                width: screenWidth * 0.8,
                height: screenWidth * 0.5,
              }}
              resizeMode="contain"
            />

            {/* Text input */}
            <TextInput
              placeholder="Enter text"
              style={styles.input}
              value={inputText} // Bind inputText to TextInput
              onChangeText={setInputText} // Update inputText state on text change
            />

            {/* Dynamic button layout */}
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Button 1" onPress={handleButton1Click} />
              </View>
              <View style={styles.button}>
                <Button title="Button 2" onPress={handleButton2Click} />
              </View>
            </View>
          </>
        ) : (
          // In landscape mode, use ScrollView
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Dynamic image scaling based on screen width */}
            <Image
              source={{ uri: 'https://media.vneconomy.vn/w800/images/upload/2021/04/20/thanh-pho-thu-dau-motbinh-duong-1512567475796-4-15-419-754-crop-1512567765603.jpg' }}
              style={{
                width: screenWidth * 0.8,
                height: screenWidth * 0.3,
              }}
              resizeMode="contain"
            />

            {/* Text input */}
            <TextInput
              placeholder="Enter text"
              style={styles.input}
              value={inputText} // Bind inputText to TextInput
              onChangeText={setInputText} // Update inputText state on text change
            />

            {/* Dynamic button layout */}
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Button 1" onPress={handleButton1Click} />
              </View>
              <View style={styles.button}>
                <Button title="Button 2" onPress={handleButton2Click} />
              </View>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.select({ ios: 20, android: 10 }), // Platform-specific padding
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.select({ ios: 10, android: 100 }), // Platform-specific padding
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: '80%',
    marginVertical: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    padding: 10,
    margin: 5,
    width: '100%', // Đảm bảo các nút bấm chiếm toàn bộ chiều rộng
  },
});

export default App;
