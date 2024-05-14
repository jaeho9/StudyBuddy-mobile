import RNPickerSelect from 'react-native-picker-select';

export const SelectPicker = ({ onChangeSort }) => {
    return (
        <RNPickerSelect
            onValueChange={(value) => onChangeSort(value)}
            useNativeAndroidPickerStyle={false}
            placeholder={{
                label: '정렬',
                value: 'done'
            }}
            items={[
                { label: '좋아요순', value: 'like' },
                { label: '댓글순', value: 'comment' },
            ]}
            style={{
                inputAndroidContainer: {
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                inputAndroid: {
                    fontSize: 14, height: 30, color: '#7A7575', textAlign: 'center', textAlignVertical: 'center', paddingVertical: 2
                },
                inputIOSContainer: {
                    width: '20%',
                    alignItems: 'flex-end',
                },
                inputIOS: {
                    fontSize: 14, height: 30, color: '#7A7575'
                }
            }}
        />
    );
};

export default SelectPicker;