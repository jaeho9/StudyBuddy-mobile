import React, { Component, useEffect, useState } from "react";
import {
    View,
    Text,
    Modal,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";

export class DeleteModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.closeModalPopupMenu}
                style={{ flex: 1 }}
            >
                <View
                    style={{
                        left: this.props.x,
                        top: this.props.y,
                        backgroundColor: "#606060",
                        borderRadius: 12,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        marginHorizontal: 11,
                    }}
                >
                    <Text style={{ color: "#FFFFFF" }}>댓글 삭제됨</Text>
                    <TouchableOpacity>
                        <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>취소</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}