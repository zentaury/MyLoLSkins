"use client";

import { CheckOutlined } from "@ant-design/icons";
import { Tooltip } from "@nextui-org/tooltip";

export const OwnedSkinChecker = () => {
    return (
        <div className=" w-[25] rounded bg-lime-700">
            <Tooltip content="Skin Owned">
                <CheckOutlined type="primary" shape="circle"/>
            </Tooltip>
        </div>
    );
}