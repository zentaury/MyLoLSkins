"use client";

import { CheckOutlined } from "@ant-design/icons";
import { Tooltip } from "@nextui-org/tooltip";

export const OwnedSkinChecker = () => {
    return (
        <Tooltip content="Skin Owned">
            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-lime-700">
                <CheckOutlined className="text-white text-lg" />
            </div>
        </Tooltip>
    );
}
