#!/bin/bash

s3cmd --config=/Users/k/.s3definery sync public/ s3://gilmanbrewing.com --exclude '.DS_Store'
s3cmd setacl --config=/Users/k/.s3definery s3://gilmanbrewing.com/ --acl-public --recursive
