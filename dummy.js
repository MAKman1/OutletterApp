import React from 'react'
import { Text } from 'react-native'

import SafeAreaView from 'react-native-safe-area-view';

function Dummy() {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>Settings</Text>
        </SafeAreaView>
    )
}

export default Dummy;