import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [userData, setUserData] = useState({});
  const [userIndex, setUserIndex] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, [userIndex]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://random-data-api.com/api/users/random_user?size=1`);
      const data = await response.json();
      setUserData(data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNextUser = () => {
    setUserIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousUser = () => {
    setUserIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const renderDetails = (label, value) => {
    return (
      <View style={styles.detailContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.borderedValueContainer}>
          <Text style={styles.fieldValue}>{value}</Text>
        </View>
      </View>
    );
  };
  
  const renderUid = () => {
    return (
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.fieldLabel}>UID:</Text>
        <View style={[styles.borderedValueContainer, { width: '100%' }]}>
          <Text style={styles.fieldValue}>{userData.uid}</Text>
        </View>
      </View>
    );
  };
  
  const renderEmail = () => {
    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>Email:</Text>
        <View style={[styles.borderedValueContainer, { width: '100%' }]}>
          <Text style={styles.fieldValue}>{userData.email}</Text>
        </View>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.photoContainer}>
          <View style={styles.circularBackground}></View>
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        </View>
        <Text style={styles.name}>{userData.first_name} {userData.last_name}</Text>
        <View style={styles.formFields}>
        {renderDetails('ID:', userData.id)}
        {renderUid()}
        {renderDetails('Password:', userData.password)}
        {renderDetails('First Name:', userData.first_name)}
        {renderDetails('Last Name:', userData.last_name)}
        {renderDetails('Username:', userData.username)}
        {renderEmail()}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, userIndex === 0 && styles.disabledButton]}
          onPress={handlePreviousUser}
          disabled={userIndex === 0}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNextUser}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 60,
    width: 120,
    height: 120,
  },
  circularBackground: {
    position: 'absolute',
    backgroundColor: '#3498db',
    width: 140,
    height: 140,
    borderRadius: 70,
    top: -30,
    left: -30,
    zIndex: -1,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  formFields: {
    width: '100%',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: '35%',
    textTransform: 'capitalize',
  },
  borderedValueContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 40, // Increase the minimum height as needed
  },
  fieldValue: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
