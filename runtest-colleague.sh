#! /bin/bash

export FEATURE=
export BROWSER=chrome
export PACK=
export SUBPACK=

yarn gulp ci-colleague --ff=$FEATURE* --browser=$BROWSER --pack=$PACK --subpack=$SUBPACK

