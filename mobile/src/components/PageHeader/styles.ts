import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#8257E5',
  },

  topBar: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 24,
    lineHeight: 22,
    maxWidth: 160,
    marginVertical: 40
  }
})

export default styles