import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SCREENS_NAMES } from '../../utils/consts'
import { Entypo } from '@expo/vector-icons'
import { purple, white } from '../../utils/colors'

const styles = StyleSheet.create({
  newDeckBtn: {
    backgroundColor: purple,
    marginRight: 30
  }
})

const AddDeckBtn = ( {navigation} ) => (
      <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS_NAMES.NEW_DECK)}
          style={styles.newDeckBtn}
        >
          <Entypo name='add-to-list' size={20} color={white} />
      </TouchableOpacity>
)

export default AddDeckBtn