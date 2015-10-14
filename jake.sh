node_modules/.bin/jake $*
[ ! -f node_module/.bin/jake ] && echo "Building node modules" && npm rebuild
