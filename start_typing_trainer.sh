#!/data/data/com.termux/files/usr/bin/sh
cd "$(dirname "$0")"
python3 -m http.server 8088 &
sleep 1
am start -a android.intent.action.VIEW -d "http://localhost:8088/index.html"
