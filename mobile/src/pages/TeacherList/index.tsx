import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import { Feather } from '@expo/vector-icons'

import api from '../../services/api'

import styles from './styles'

function TeacherList() {
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const [teachers, setTeachers] = useState([])
  const [subject, setSubject] = useState('')
  const [week_day, setWeek_day] = useState('')
  const [time, setTime] = useState('')

  function handleToggleFilterVisible() {
    setIsFilterVisible(!isFilterVisible)
  }

  async function handlerFilterSubmit() {
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setIsFilterVisible(false)
    setTeachers(response.data)
  }

  useEffect(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTechers = JSON.parse(response)
        const favoritedTechersIds = favoritedTechers.map((teacher: Teacher) => teacher.id)
        
        setFavorites(favoritedTechersIds)
      }
    })
  }, [favorites])

  return (
    <View style={styles.container} >
      <PageHeader
        title='Proffys disponíveis'
        headerRight={(
          <BorderlessButton onPress={handleToggleFilterVisible} >
            <Feather name='filter' size={24} color='#FFF' />
          </BorderlessButton >
        )}
      >
        {isFilterVisible && (
          <View style={styles.searchForm} >
            <Text style={styles.label} >Selecione</Text>

            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder='Qual a matéria'
              placeholderTextColor='#C1bCCC'
            />

            <View style={styles.inputGroup} >
              <View style={styles.inputBlock} >
                <Text style={styles.label} >Dia da semana</Text>

                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeek_day(text)}
                  placeholder='Qual o dia?'
                  placeholderTextColor='#C1bCCC'
                />
              </View>

              <View style={styles.inputBlock} >
                <Text style={styles.label} >Horário</Text>

                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder='Qual o horário'
                  placeholderTextColor='#C1bCCC'
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handlerFilterSubmit} >
              <Text style={styles.submitButtonText} >Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        } )}
      </ScrollView>
    </View>
  )
}

export default TeacherList