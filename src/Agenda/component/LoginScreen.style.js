import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4'
  },
  input: {
    height: 40,
    fontSize: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderRadius: 8
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4
  },
  container: {
    width: '80%',
    borderRadius: 10,
    marginBottom: 10
  },
  borderError: {
    borderWidth: 1,
    borderColor: 'rgba(200,0,50,1)'
  },
  errorMessage: {
    fontSize: 12,
    color: 'rgba(200,0,50,1)',
    textAlign: 'center',
    marginTop: 5
  },
  buttonNew: {
    alignSelf: 'flex-start',
    marginTop: 15,
    marginRight: 22,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#00BDF0',
  },
  button: {
    alignSelf: 'flex-end',
    marginTop: 15,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#00BDF0',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})

export default styles