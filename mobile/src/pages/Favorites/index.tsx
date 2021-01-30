import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import styles from './styles'

function Favorites() {
  const [favorites, setFavorites] = useState([])

  useFocusEffect(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTechers = JSON.parse(response)
        
        setFavorites(favoritedTechers)
      }
    })
  })

  return(
    <View style={styles.container} >
      <PageHeader title='Meus proffys Favoritos' />

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited
            />
          )
        } )}
      </ScrollView>
    </View>
  )
}

export default Favorites