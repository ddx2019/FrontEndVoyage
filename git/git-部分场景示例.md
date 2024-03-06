# 前提

这里默认Git远程仓库的名称为`origin`,且未被改动过

当你使用 `git clone` 命令克隆一个仓库时，Git 会自动创建一个名为 `origin` 的远程仓库别名，指向你克隆的仓库。

## 通常的提交步骤

在多人合作的项目中，Git 的普通提交步骤可能会有所不同，具体取决于你的工作进程。以下是一种常见的步骤：

```bash
# 1. 将你的更改添加到暂存区
git add .

# 2. 将暂存区的内容提交到本地仓库
git commit -m "Your commit message"

# 3. 从远程分支拉取最新的代码并合并
git pull

# 4. 将你的更改推送到远程分支
git push
```

这个流程首先使用 `git add .` 命令将你的更改添加到暂存区，然后使用 `git commit -m "Your commit message"` 命令将暂存区的内容提交到本地仓库。接着，使用 `git pull` 命令从远程分支拉取最新的代码并合并。最后，使用 `git push` 命令将你的更改推送到远程分支。

这个步骤做了以下假设：

1. **当前分支**：你已经在你想要提交更改的分支上。`git add .` 和 `git commit -m "Your commit message"` 命令会在当前活动的分支上工作。

2. **追踪远程分支**：你的本地分支已经设置了一个追踪远程分支。`git pull` 和 `git push` 命令默认会操作当前分支的追踪远程分支。如果没有设置追踪远程分支，你需要在这些命令后面指定远程仓库和分支。

3. **工作目录**：你的工作目录是干净的，也就是说你已经将所有你想要提交的更改添加到了暂存区。`git add .` 命令会将工作目录中的所有更改添加到暂存区。

4. **权限**：你有权限将更改推送到远程仓库。`git push` 命令需要你有权限将更改推送到远程仓库。

5. **远程仓库**：远程仓库是最新的，或者远程仓库的更改可以自动合并到你的本地分支。`git pull` 命令会尝试自动合并远程分支的更改。如果存在冲突，你需要手动解决这些冲突。

## 第一次提交本地项目代码到 github 仓库

首先，你需要在本地初始化一个 Git 仓库，然后将你的项目代码添加到这个仓库中。然后，你可以创建一个新的提交，并将这个提交推送到 GitHub 仓库。

以下是具体的步骤：

```bash
# 1. 初始化一个新的 Git 仓库
git init

# 2. 将你的项目文件添加到 Git 仓库
git add .  # 将你项目目录下的所有文件添加到 Git 仓库

# 3. 创建一个新的提交
git commit -m "Initial commit"  # "Initial commit" 是你的提交信息

# 4. 将你的本地仓库链接到 GitHub 仓库
git remote add origin <your-github-repo-url>  # 将 <your-github-repo-url> 替换为你在 GitHub 上创建的仓库的 URL

# 5. 将你的提交推送到 GitHub 仓库
git push -u origin master  # 将你的 master 分支的更改推送到 origin 远程仓库
```

这个流程首先使用 `git init` 命令初始化一个新的 Git 仓库，然后使用 `git add .` 命令将你的项目文件添加到 Git 仓库。接着，使用 `git commit -m "Initial commit"` 命令创建一个新的提交。然后，使用 `git remote add origin <your-github-repo-url>` 命令将你的本地仓库链接到 GitHub 仓库。最后，使用 `git push -u origin master` 命令将你的提交推送到 GitHub 仓库。

## 新建本地分支，并将其推送到远程仓库

```bash
# 1. 创建并切换到新的分支
git checkout -b new-branch

# 2. 将新分支推送到远程仓库
git push -u origin new-branch
```

这个流程首先使用 `git checkout -b` 命令创建并切换到新的分支，然后使用 `git push -u origin` 命令将新分支推送到远程仓库。
在这个例子中，`-b` 选项告诉 Git 创建一个新的分支，并立即切换到这个新分支。`-u` 选项（或 `--set-upstream`）告诉 Git 设置远程仓库和新分支的关联，这样在未来的 `git pull` 和 `git push` 操作中就不需要再指定远程仓库和分支了。

## 撤销上一个未 push到远程仓库的commit

### 刚提交了一个commit，希望撤销这个commit信息，但保留所做的更改以便重新提交

假设你正在 `feature-branch` 分支上工作，你修改了 `index.vue` 文件并提交了这个更改，但后来你发现这个提交有误，你想撤销这个提交，但保留所做的更改以便重新提交。以下是具体的操作步骤：

```bash
# 1. 查看提交历史
git log  # 这将显示所有的提交历史，每个提交都有一个唯一的哈希值

# 2. 撤销指定的提交
git reset --mixed abc123  # 假设你找到了你想要撤销的提交，其哈希值为 abc123,执行这个命令后，`abc123` 提交之后的所有更改将被撤销，但这些更改会被放回到工作区，不在暂存区。这样你可以重新添加和提交这些更改。

# 3. 重新添加文件
git add index.vue  # 例如，你可以重新添加 index.vue 文件

# 4. 重新提交文件
git commit -m "修复 index.vue 文件"  # 然后，你可以重新提交这个文件
```

这个流程首先使用 `git log` 命令查看提交历史，然后使用 `git reset --mixed abc123` 命令撤销指定的提交。接着，使用 `git add index.vue` 命令重新添加文件，最后使用 `git commit -m "修复 index.vue 文件"` 命令重新提交文件。

请注意，`git reset --mixed` 命令只会影响你的本地仓库，不会影响到远程仓库。如果你已经将更改推送到了远程仓库，你需要使用 `git push -f` 命令强制推送你的更改。但请谨慎使用这个命令，因为它会覆盖远程仓库的历史，一般不建议使用，除非你十分清楚用`-f`提交的后果依然选择`-f`(如项目只有一人维护，且你确实想覆盖远程仓库的内容和提交历史)。

假设你正在 `feature-branch` 分支上工作，你修改了 `index.vue` 文件并提交了这个更改。你可以使用 `git log` 命令查看提交历史，可能会看到类似以下的输出：

```bash
commit abc123def456ghi789jkl012mno345pqr678stu9
Author: Your Name <your.email@example.com>
Date:   Mon Sep 20 14:30:00 2021 +0800

    修改 index.vue 文件
```

在这个例子中，`abc123def456ghi789jkl012mno345pqr678stu9` 是提交的哈希值，`Your Name <your.email@example.com>` 是提交者的信息，`Mon Sep 20 14:30:00 2021 +0800` 是提交的时间，`修改 index.vue 文件` 是提交的信息。

如果你使用 `git reset --mixed abc123def456ghi789jkl012mno345pqr678stu9` 命令撤销这个提交，然后重新添加 `index.vue` 文件并提交，你可以再次使用 `git log` 命令查看提交历史，可能会看到类似以下的输出：

```bash
commit def456ghi789jkl012mno345pqr678stu9abc123
Author: Your Name <your.email@example.com>
Date:   Mon Sep 20 15:00:00 2021 +0800

    修复 index.vue 文件
```

在这个例子中，`def456ghi789jkl012mno345pqr678stu9abc123` 是新的提交的哈希值，`Your Name <your.email@example.com>` 是提交者的信息，`Mon Sep 20 15:00:00 2021 +0800` 是新的提交的时间，`修复 index.vue 文件` 是新的提交的信息。你会注意到，原来的提交已经不再出现在提交历史中。

## git rebase (git变基，整理提交历史)

### git  rebase 释意

git rebase 的主要用途是将一系列提交（commit）应用到另一个基底之上，这样可以使得提交历史更加清晰，避免了合并（merge）可能带来的复杂性。

例如，假设你在 master 分支的基础上创建了一个新的 feature 分支，并在 feature 分支上进行了一些提交。在此期间，master 分支也有了新的提交。现在，你希望将 feature 分支上的更改更新到 master 分支的最新状态。此时使用 git rebase 来实现这个目标：

```bash
git checkout feature
git rebase master
```

`git rebase master` 命令的工作原理：

1. Git 会找到 `feature` 分支和 `master` 分支的共同祖先提交。这是两个分支最后一次共享的提交。

2. Git 会获取从那个共同祖先提交以来 `feature` 分支上的所有提交，并将这些提交保存为临时文件。这些临时文件包含了 `feature` 分支上的所有更改。

3. Git 会将 `feature` 分支的 HEAD 指针移动到 `master` 分支的最新提交。这就是 "rebase" 的含义，即 "重新设置基底"。

4. Git 会依次取出之前保存的临时文件，并尝试将它们应用到新的 `feature` 分支上。这就是 "将 `feature` 分支上的更改重新应用到 `master` 分支的最新提交之上" 的含义。

这个过程可能会遇到冲突，即 feature 分支上的更改与 master 分支的最新提交之间有不兼容的部分。在这种情况下，Git 会暂停 rebase 操作，让你解决冲突。解决冲突后，你可以使用 git rebase --continue 命令继续 rebase 操作。

通过这个过程，`git rebase master` 命令实现了将 `feature` 分支上的更改重新应用到 `master` 分支的最新提交之上，使得 `feature` 分支像是在 `master` 分支的`最新状态`上新建的一样。

### 取消仓库的pull.rebase设置

即使你已经设置了`git config --global pull.rebase false`，这将设置全局的`pull.rebase`为`false`，但是如果你在执行`git pull`命令时指定了`--rebase`选项，或者你的仓库配置中设置了`pull.rebase`为`true`，那么`git pull`仍然会使用变基。

你可以检查你的仓库配置，看看是否有设置`pull.rebase`。运行以下命令：

```bash
git config --local --get pull.rebase
```

如果这个命令返回`true`，那么你的仓库配置中设置了`pull.rebase`为`true`。你可以使用以下命令来取消这个设置：

```bash
git config --local --unset pull.rebase
```

此外，如果你在执行`git pull`命令时不想使用变基，你可以指定`--no-rebase`选项。例如：

```bash
git pull --no-rebase
```

### 终止 git rebase

#### 如果你想在解决冲突的过程中终止git rebase，你可以使用`git rebase --abort`命令

这将停止rebase过程并将你的分支回滚到rebase开始之前的状态。这是你的命令：

```bash
git rebase --abort
```

这将终止rebase过程并将你的分支恢复到rebase开始之前的状态。

#### 如果你已经解决了一些冲突并且已经提交了这些更改，那么你需要先找到你开始rebase之前的提交点。你可以使用git reflog命令来查看你的git历史，找到你开始rebase之前的提交点的哈希值

一旦你找到了这个哈希值，你可以使用`git reset --hard <hash>`命令来回滚到那个提交点。这将撤销所有你在那个提交点之后做的更改，包括你解决冲突的更改。

这是你的命令：

```bash
git reflog
# 找到你开始rebase之前的提交点的哈希值 
git reset --hard <hash>
```

请注意，`git reset --hard <hash>`是一个危险的命令，它会永久地删除你在那个提交点之后做的所有更改。在你运行这个命令之前，确保你没有未提交的更改，或者你已经备份了你的更改。

这个命令会忽略`pull.rebase`的设置，强制使用合并。

## 使用 Git Stash 保存和恢复更改，同时在修复 Bug 和功能分支之间切换的实践操作流程

假设你正在 `feature-branch` 分支上工作，你修改了 `index.vue` 文件，但突然你需要切换到另一个分支 `bugfix-branch` 去修复一个紧急的 bug。你不想提交当前的更改，因为你的工作还没有完成。这就是 `git stash save` 的一个典型使用场景。

```bash
# 1. 保存你的更改，并给这个 stash 一个描述性的消息
git stash save "保存 index.vue 的更改" # 注意，若你的内容存在未被git追踪到的文件（如你的index.vue文件是新创建的，需先执行git add 命令(如git add . 表示添加所有修改到暂存区)，将其添加到暂存区后，才能被存入stash）

# 2. 切换到 `bugfix-branch` 分支
git checkout bugfix-branch

# 3. 修复 bug 并提交更改后，切换回 `feature-branch` 分支
git checkout feature-branch

# 4. 查看所有的 stash
git stash list

# 5. 恢复你之前保存的更改
git stash pop #等价于 git stash pop stash@{0}

```

这个流程首先使用 `git stash save` 命令保存你的更改，然后切换到 `bugfix-branch` 分支。修复 bug 并提交更改后，切换回 `feature-branch` 分支。然后，使用 `git stash list` 命令查看所有的 stash，最后使用 `git stash pop` 命令恢复你之前保存的更改。

## `git stash pop` 后出现冲突

如果在执行 `git stash pop` 后出现冲突，这意味着你在 stash 之后对同一文件做了一些更改，这些更改与 stash 中的更改冲突。你需要手动解决这些冲突。

解决冲突的步骤如下：

```bash
# 1. 打开冲突的文件，查找以下标记：
# <<<<<<< Updated upstream
# =======
# >>>>>>> Stashed changes

# 2. 删除这些标记，并解决冲突。你可以选择保留上游的更改（在 ======= 上面的部分），或者保留 stash 的更改（在 ======= 下面的部分），或者创建一个全新的更改。

# 3. 保存并关闭文件。

# 4. 添加并提交解决冲突后的文件：
git add .
git commit -m "Resolve stash pop conflicts"
```

这个流程首先打开冲突的文件，然后查找冲突标记。解决冲突后，保存并关闭文件。最后，添加并提交解决冲突后的文件。

## 将feature分支的合并到master分支

 在 Git 中，将 feature 分支合并到 master 分支的操作可以通过以下步骤完成：

```bash
# 切换到 master 分支
git checkout master

# 拉取最新的 master 分支代码
git pull

# 将 feature 分支合并到 master 分支
git merge feature

# 如果有冲突，解决冲突，然后再次添加和提交
# git add .
# git commit -m "Resolve merge conflicts"

# 将合并后的更改推送到远程的 master 分支
git push
```

这个流程首先切换到 master 分支，然后拉取最新的代码。接着，使用 `git merge` 命令将 feature 分支的更改合并到 master 分支。如果在合并过程中出现冲突，需要手动解决这些冲突，然后再次添加和提交。最后，将合并后的更改推送到远程的 master 分支。
