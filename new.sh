echo "Make new branch name: $1 ✨"
git checkout --orphan $1
echo "Cleaning...🧹"
git rm --cached -r .
rm -rf ./*
echo "Create New Vue Project 👑"
vue create .
