

[ ! -f node_modules/.bin/jake ] && echo "Running npm rebuild" && npm rebuild


node_modules/.bin/jake $*
