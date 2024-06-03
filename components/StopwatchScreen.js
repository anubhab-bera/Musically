import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const StopwatchScreen = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const startStop = () => {
    setRunning(!running);
  };

  const lap = () => {
    setLaps(prevLaps => [...prevLaps, formatTime(time)]);
  };

  const reset = () => {
    setTime(0);
    setRunning(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/clock.jpg')} style={styles.clockGif} />
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.lapContainer}>
        {laps.map((lapTime, index) => (
          <Text key={index} style={styles.lapText}>
            Lap {index + 1}: {lapTime}
          </Text>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={startStop}>
          <Text style={styles.buttonText}>{running ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={lap}>
          <Text style={styles.buttonText}>Lap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockGif: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  time: {
    fontSize: 30,
    marginBottom: 20,
  },
  lapContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  lapText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default StopwatchScreen;
