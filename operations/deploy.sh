#!/bin/bash

s3cmd --config=/Users/k/.s3/.s3definery sync public/ s3://gilmanbrew.com --exclude '.DS_Store'
s3cmd setacl --config=/Users/k/.s3/.s3definery s3://gilmanbrew.com/ --acl-public --recursive
