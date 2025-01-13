"use client";

import { CheckOutlined } from "@ant-design/icons";
import { Tooltip } from "@nextui-org/tooltip";

export const OwnedSkinChecker = () => {
    return (
        <div className=" justify-center w-10 rounded-full bg-lime-700">
            <Tooltip content="Skin Owned">
                <CheckOutlined shape="circle" type="primary" />
            </Tooltip>
        </div>
    );
}