echo "Make new branch name: $1 ✨"
git checkout --orphan $1
echo "cleaning...🗑"
git rm --cached -r .
rm -rf ./*