echo "Make new branch name: $1 โจ"
git checkout --orphan $1
echo "Cleaning...๐งน"
git rm --cached -r .
rm -rf ./*
echo "Create New Vue Project ๐"
vue create .
