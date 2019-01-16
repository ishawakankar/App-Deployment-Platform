#!/usr/bin/expect
# addip address
set URL [lindex $argv 0];
set REPO [lindex $argv 1];
spawn  ssh -o "StrictHostKeyChecking no" -t farooqui@172.23.238.204 "sh script.sh $URL $REPO"
expect "password:"
send "goldtree\n"
interact

