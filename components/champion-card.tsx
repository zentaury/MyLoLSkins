"use client";

import Link from "next/link";
import { title } from "./primitives";
import { Card, CardBody } from "@nextui-org/card";
import { Children } from "react";

export function ChampionCard({ name }: ChampionCardProps) {

    return (
            <Link className="items-center justify-center text-center max-w-sm" href={name}>
                <Card isPressable isHoverable onPress={() => { }}>
                    <CardBody>
                        <p>{name}</p>
                    </CardBody>
                </Card>
            </Link>
    );
};