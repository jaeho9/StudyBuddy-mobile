import RNPickerSelect from 'react-native-picker-select';

export const SelectPicker = () => {
    return (
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            useNativeAndroidPickerStyle={false}
            placeholder={{
                label: '정렬',
                value: 'done'
            }}
            items={[
                { label: '최신순', value: 'new' },
                { label: '좋아요순', value: 'like' },
                { label: '댓글순', value: 'comment' },
            ]}
            style={{
                inputAndroidContainer: {
                    width: '20%',
                    alignItems: 'flex-end'
                },
                inputAndroid: {
                    fontSize: 14, height: 30, color: '#7A7575'
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