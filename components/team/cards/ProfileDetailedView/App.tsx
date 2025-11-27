"use client";

import type {Users} from "../../data";

import React from "react";
import {Card, CardHeader, CardBody, Button, Avatar, Tabs, Tab, Chip} from "@heroui/react";

import UserPost from "./user-post";

export default function Component({user}: {user: Users}) {
  return (
    <div className="flex w-full items-start justify-center p-3">
      <Card className="my-2 w-full max-w-[900px]">
        <CardHeader className="relative flex h-[100px] flex-col justify-end overflow-visible bg-linear-to-br from-pink-300 via-purple-300 to-indigo-400">
          <Avatar className="h-20 w-20 translate-y-12" src={user.memberInfo.avatar} />
          <Button
            className="absolute top-3 right-3 bg-white/20 text-white dark:bg-black/20"
            radius="full"
            size="sm"
            variant="light"
          >
            Edit Profile
          </Button>
        </CardHeader>
        <CardBody>
          <div className="pt-6 pb-4">
            <p className="text-large font-medium">{user.memberInfo.name}</p>
            <p className="text-small text-default-400 max-w-[90%]">{user.memberInfo.email}</p>
            {!!user.teams?.length && (
              <div className="flex flex-wrap gap-2 pt-2 pb-1">
                {user.teams.map((t) => (
                  <Chip key={t} variant="flat">
                    {t}
                  </Chip>
                ))}
              </div>
            )}
            <p className="text-small text-foreground py-2">
              {user.role} • {user.workerType}
            </p>
            <div className="flex gap-2">
              <p>
                <span className="text-small text-default-500 font-medium">13</span>&nbsp;
                <span className="text-small text-default-400">Following</span>
              </p>
              <p>
                <span className="text-small text-default-500 font-medium">2500</span>&nbsp;
                <span className="text-small text-default-400">Followers</span>
              </p>
            </div>
          </div>
          <Tabs
            fullWidth
            classNames={{
              panel: "mt-2",
            }}
          >
            <Tab key="posts" title="Posts">
              {Array.from({length: 6}).map((_, i) => (
                <UserPost
                  key={i}
                  avatar={user.memberInfo.avatar}
                  comments={12}
                  date={new Intl.DateTimeFormat("en-US").format(user.startDate)}
                  likes={123}
                  name={user.memberInfo.name}
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor."
                  username={user.memberInfo.email}
                />
              ))}
            </Tab>
            <Tab key="likes" title="Likes">
              {Array.from({length: 2}).map((_, i) => (
                <UserPost
                  key={i}
                  avatar={user.memberInfo.avatar}
                  comments={12}
                  date={new Intl.DateTimeFormat("en-US").format(user.startDate)}
                  likes={123}
                  name={user.memberInfo.name}
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor."
                  username={user.memberInfo.email}
                />
              ))}
            </Tab>
            <Tab key="comments" title="Media">
              {Array.from({length: 1}).map((_, i) => (
                <UserPost
                  key={i}
                  avatar={user.memberInfo.avatar}
                  comments={12}
                  date={new Intl.DateTimeFormat("en-US").format(user.startDate)}
                  likes={123}
                  name={user.memberInfo.name}
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor."
                  username={user.memberInfo.email}
                />
              ))}
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
