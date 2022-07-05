# Multi-instance / proxy setup

Instructions from [https://docs.colyseus.io/colyseus/scalability/](https://docs.colyseus.io/colyseus/scalability/) and [https://github.com/colyseus/proxy](https://github.com/colyseus/proxy)

First follow the instructions in README.md

The below will then allow you to run multiple instances of the gameserver behind an instance of [@colyseus/proxy](https://github.com/colyseus/proxy) – which in turn is behind a nginx proxy.

```
80 (nginx) => 2567 (colyseus proxy) => 3001..300x (game servers)
```

## 1. Install Redis

```
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis
```

```
redis-cli ping
```

## 2. Install and start mongoDB

```
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

```
sudo systemctl start mongod
sudo systemctl status mongod
```

## 3. Transpile Typescript to Javascript

```
npm i --save-dev typescript ts-node-dev
npx tsc
```

## 4. Start the processes with pm2

```
pm2 start
pm2 logs
```










