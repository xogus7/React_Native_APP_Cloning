import React, { useState, useCallback } from 'react';
import { View, Image, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Platform, useWindowDimensions, Keyboard } from 'react-native';
import Modal from 'react-native-modal';

const more = require('../assets/icons/more.png');
const addButton = require('../assets/icons/bottomtab/add_circle_off.png');


const dummy_comments = [
    {
        id: 1,
        name: 'Jeontaeyoung_5812',
        contents: '와 잘 봤어요!',
        profileImg: 'https://picsum.photos/60/60',
    },
    {
        id: 2,
        name: 'Leemin',
        contents: '입으신 제품 뭐에요?',
        profileImg: 'https://picsum.photos/60/60',
    }
]

const CommentItem = ({item, index}) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', columnGap: 6}}>
            <Image source={{uri : item.profileImg}} style={{width:32, height: 32, borderRadius: 16}} />
            <View style={{ flex: 1, rowGap: 3}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 8}}>
                    <Text style={{fontSize: 13}}>{item.name}</Text>
                    <Text style={{fontSize: 12, color: '#333'}}>24분전</Text>
                </View>
                <Text style={{ color: '#333', fontSize: 15}}>
                    {item.contents}
                </Text>
            </View>
            <TouchableOpacity>
                <Image source={more} style={{width: 24, height: 24}} />
            </TouchableOpacity>
            
        </View>
    )
}

const CommentsModal = ({ isVisible, setIsVisible }) => {
    const [textValue, setTextValue] = useState('');
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

    const renderItem = useCallback(({item, index}) => <CommentItem item={item} index={index} />, [])

    return (
        <Modal
            useNativeDriver
            isVisible={isVisible}
            animationIn={'slideInUp'}
            animationInTiming={300}
            animationOut={'slideOutDown'}
            animationOutTiming={300}
            backdropColor='#000'
            backdropOpacity={0.4}
            style={{ margin: 0, alignItems: 'center', justifyContent: 'flex-end' }}
            onBackdropPress={() => {
                Keyboard.dismiss();
                setIsVisible(!isVisible);
            }}
            onBackButtonPress={() => {
                Keyboard.dismiss();
                setIsVisible(!isVisible);
            }}
            hideModalContentWhileAnimating
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={8}
                style={{ width: '100%' }}
            >
                <View style={{
                    paddingTop: 20,
                    paddingHorizontal: 16,
                    height: SCREEN_HEIGHT / 1.5,
                    backgroundColor: '#FFF',
                    borderTopEndRadius: 16,
                    borderTopStartRadius: 16
                }}>
                    <View
                        pointerEvents='none'
                        style={{
                            position: 'absolute',
                            top: 16,
                            left: 0,
                            right: 0,
                            alignItems: 'center'
                        }}
                    >
                        <View style={{ width: 30, height: 4, borderRadius: 4, backgroundColor: '#EEE' }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ height: 30, justifyContent: 'center' }}>
                            <Text>댓글</Text>
                        </View>
                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            data={dummy_comments}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            // ListEmptyComponent={}
                            ItemSeparatorComponent={() => <View style={{ height: 32}} />}
                            style={{ flex: 1}}
                        />
                    </View>
                    <View style={{ borderTopWidth: 1, borderColor: '#EEE', flexDirection: 'row', alignItems: 'flex-end'}}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            paddingHorizontal: 12,
                            marginTop: 16,
                            marginBottom: 24,
                            minHeight: 40,
                            maxHeight: 130,
                            borderRadius: 6,
                            borderWidth: 1,
                            borderColor: '#666'
                        }}>
                            <TextInput
                                style={{
                                    minHeight: 23,
                                    maxHeight: 80,
                                    paddingVertical: 0,
                                    lineHeight: 18,
                                    fontSize: 15,
                                    color: '#3A3A3A'
                                }}
                                multiline
                                maxLength={200}
                                placeholder='댓글을 입력해주세요.'
                                placeholderTextColor="#BBB"
                                autoCapitalize='none'
                                spellCheck={false}
                                autoCorrect={false}
                                value={textValue}
                                onChangeText={(text) => setTextValue(text)}
                            />
                        </View>
                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 28
                        }}>
                            <Image source={addButton} style={{ width: 32, height: 32}} />
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </Modal>
    )
}

export default CommentsModal
