
# 常用命令

以下是一些常用的Git命令的详细描述：

1. `git init`：这个命令用于在当前目录下初始化一个新的Git仓库。它会创建一个名为`.git`的隐藏目录，这个目录包含了所有的Git需要的仓库数据和元数据。

2. `git clone <url>`：这个命令用于克隆一个远程仓库到本地。它会创建一个新的目录，复制远程仓库的所有文件和版本历史。

3. `git add <file>`：这个命令用于将文件的更改添加到暂存区。暂存区是一个中间区域，用于准备下一次的提交。

4. `git commit -m "<message>"`：这个命令用于提交暂存区的更改，并添加一个描述更改的消息。这个消息将会出现在版本历史中。

5. `git push <remote> <branch>`：这个命令用于将本地的更改推送到远程仓库。`<remote>`是远程仓库的名字，`<branch>`是要推送的分支的名字。

6. `git pull <remote> <branch>`：这个命令用于从远程仓库拉取最新的更改，并合并到当前分支。`<remote>`是远程仓库的名字，`<branch>`是要拉取的分支的名字。

7. `git branch <branch>`：这个命令用于创建一个新的分支。分支是用于隔离开发工作的，你可以在一个分支上开发新的功能，而不影响其他分支。

8. `git checkout <branch>`：这个命令用于切换到指定的分支。当你切换分支时，Git会更新工作目录以匹配新分支的快照。

9. `git merge <branch>`：这个命令用于将指定分支的更改合并到当前分支。Git会尝试自动合并更改，但是如果两个分支修改了同一个文件的同一部分，就会产生冲突，需要手动解决。

10. `git status`：这个命令用于查看当前仓库的状态，包括哪些文件被修改，哪些修改被暂存，当前在哪个分支等。

11. `git log`：这个命令用于查看提交历史。它会显示所有的提交，最新的提交在最上面。

12. `git diff`：这个命令用于查看未暂存的更改。它会显示所有修改过但还没有暂存的文件的更改。

13. `git reset`：这个命令用于重置当前HEAD到指定状态。它有三种模式：`--soft`，`--mixed`，`--hard`，分别用于只重置HEAD，重置HEAD和暂存区，重置HEAD、暂存区和工作目录。

14. `git rm <file>`：这个命令用于从工作区和索引中删除文件。如果文件已经被Git跟踪，需要使用`-f`选项来强制删除。

15. `git stash` 临时保存工作区的更改。这在你需要切换到其他分支，但又不想提交当前工作区的更改时非常有用

# `git remote` 查看远程仓库的名称

当你使用 `git clone` 命令克隆一个仓库时，Git 会自动创建一个名为 `origin` 的远程仓库别名，指向你克隆的仓库。

你可以使用 `git remote` 命令来查看远程仓库的名称。如果你想查看远程仓库的详细信息，包括 URL，你可以添加 `-v` 选项，如下所示：

```bash
git remote -v
```

这将显示所有远程仓库的名称和对应的 URL。例如，你可能会看到类似以下的输出：

```bash
origin  https://github.com/username/repository.git (fetch)
origin  https://github.com/username/repository.git (push)
```

在这个例子中，`origin` 是远程仓库的名称，`https://github.com/username/repository.git` 是远程仓库的 URL。

`origin` 是可以被改动的。你可以使用 `git remote rename` 命令来重命名它。例如，如果你想将 `origin` 重命名为 `upstream`，你可以这样操作：

```bash
git remote rename origin upstream
```

同样，你也可以使用 `git remote set-url` 命令来改变 `origin` 的 URL。例如，如果你想将 `origin` 的 URL 改为 `https://github.com/username/new-repository.git`，你可以这样操作：

```bash
git remote set-url origin https://github.com/username/new-repository.git
```
这些操作都会影响到你的本地仓库，不会影响到远程仓库。

# git branch 查看分支的列表

 使用`git branch`命令来查看分支的列表。当前活动的分支前面会有一个`*`标记。

 1. `git branch` 查看本地仓库的所有分支
 2. `git branch -r` 查看远程分支列表 （ `-r`是`--remote`的缩写）
 3. `git branch -a` 查看本地和远程的分支 （ `-a`是`--all`的缩写）

# 远程分支操作

在多人合作的项目中，你可能需要将本地分支与远程分支进行交互。

以下是一些常见的操作：

## 指定远程仓库和分支

如果你的本地分支没有设置追踪远程分支，你可以在 `git pull` 和 `git push` 命令后面指定远程仓库和分支。例如：

```bash
git pull origin master  # 从远程仓库 origin 的 master 分支拉取最新的代码并合并到当前分支
git push origin feature  # 将当前分支的更改推送到远程仓库 origin 的 feature 分支
```

在这些命令中，`origin` 是远程仓库的名称，`master` 和 `feature` 是远程分支的名称。

## 设置追踪远程分支

如果你想要设置一个追踪远程分支，你可以使用 `git branch --set-upstream-to` 命令。例如：

```bash
git branch --set-upstream-to=origin/master feature  # 设置了你的本地 `feature` 分支追踪远程仓库 `origin` 的 `master` 分支。
```

在这个命令中，`origin/master` 是你想要追踪的远程分支，`feature` 是你的本地分支。

## 追踪远程分支的含义

在 Git 中，"追踪远程分支"意味着将你的本地分支与一个远程分支关联起来。这样做的好处是，当你在本地分支上执行 `git pull` 或 `git push` 时，Git 会知道这些命令应该与哪个远程分支进行交互。

例如，如果你设置了本地的 `feature` 分支追踪远程仓库 `origin` 的 `master` 分支，那么当你在 `feature` 分支上执行 `git pull`，Git 会从 `origin/master` 拉取更新并合并到 `feature` 分支。同样，当你在 `feature` 分支上执行 `git push`，Git 会将 `feature` 分支的更改推送到 `origin/master`。

这样的设置可以简化你的工作流，因为你不需要每次都指定远程仓库和分支。此外，通过 `git status` 命令，你可以方便地查看本地分支与追踪的远程分支之间的差异，例如是否有新的提交需要拉取或推送。

## 追踪远程分支的好处

追踪远程分支在 Git 中有几个主要的好处：

1. **简化命令**：如果你的本地分支设置了追踪远程分支，那么在执行 `git pull` 或 `git push` 时，不需要再指定远程仓库和分支，Git 会自动知道应该与哪个远程分支进行交互。

2. **方便查看状态**：通过 `git status` 命令，你可以方便地查看本地分支与追踪的远程分支之间的差异，例如是否有新的提交需要拉取或推送。

3. **自动合并**：在执行 `git pull` 时，如果本地分支设置了追踪远程分支，Git 会自动将远程分支的更新合并到本地分支。

4. **方便同步**：如果你想要将本地分支与远程分支保持同步，设置追踪远程分支会非常方便。

## 查看远程分支

你可以使用 `git branch -r` 或 `git branch --remote` 命令查看远程分支列表。

## 删除远程分支

如果你想要删除远程分支，你可以使用 `git push origin --delete <branch_name>` 命令（推荐使用它）。例如：

```bash
git push origin --delete feature  # 删除远程仓库 origin 的 feature 分支

```

你也可以推送一个空分支到远程分支的效果等同于删除远程分支(在 Git 中，推送一个空分支到远程分支的效果等同于删除远程分支)：

```bash
git push origin :feature #将一个空分支（即没有任何提交的分支）推送到 `origin` 远程仓库的 `feature` 分支，即删除远程仓库 origin 的 feature 分支
```
请注意，删除远程分支的操作是不可逆的，所以在执行前请确保你真的想要删除这个远程分支。

## 拉取所有远程分支

你可以使用 `git fetch origin` 命令拉取远程仓库 `origin` 的所有更新。这个命令不会自动合并或修改你当前的工作，只是将远程的更改下载到本地。

```bash
git fetch origin  # 拉取远程仓库 origin 的所有更新
```

## 拉取并合并远程分支

如果你想要合并远程分支到你当前的分支，你可以先使用 `git fetch origin` 拉取远程分支，然后使用 `git merge origin/<branch_name>` 命令合并远程分支。例如：

```bash
git fetch origin  # 拉取远程仓库 origin 的所有更新
git merge origin/feature  # 将远程仓库 origin 的 feature 分支合并到当前分支
```

你也可以使用 `git pull origin <branch_name>` 命令直接拉取并合并远程分支。例如：

```bash
git pull origin feature  # 从远程仓库 origin 的 feature 分支拉取最新的代码并合并到当前分支
```

## 两种方式的区别

 `git fetch origin` 和 `git merge origin/feature` 的组合 与 `git pull origin feature` 的主要区别在于它们的执行方式和控制级别。

1. **执行方式**：`git fetch origin` 和 `git merge origin/feature` 是两个独立的命令，你可以在 `git fetch origin` 后查看新的提交，然后决定是否要合并。而 `git pull origin feature` 是一个组合命令，它会立即拉取并尝试合并远程分支的更改。

2. **控制级别**：`git fetch origin` 和 `git merge origin/feature` 提供了更高的控制级别，因为你可以在合并前查看更改。而 `git pull origin feature` 则更适合你完全信任远程更改，并希望快速更新本地分支的情况。

总的来说，如果你想要更高的控制级别，或者在合并前查看更改，你应该使用 `git fetch origin` 和 `git merge origin/feature`。如果你完全信任远程更改，并希望快速更新本地分支，你应该使用 `git pull origin feature`。

## 推送本地分支到远程仓库

你可以使用 `git push origin <branch_name>` 命令将本地分支的更改推送到远程仓库。例如：

```bash
git push origin feature  # 将本地的 feature 分支的更改推送到远程仓库 origin 的 feature分支
```
 
这里的 `origin` 是远程仓库的名称，通常 `origin` 是你克隆仓库时默认的远程仓库名称。`feature` 是分支的名称。

如果远程仓库 `origin` 中没有 `feature` 分支，这个命令会在 `origin` 中创建一个新的 `feature` 分支。如果远程仓库 `origin` 中已经有 `feature` 分支，这个命令会更新远程的 `feature` 分支以匹配你本地的 `feature` 分支。


# `git push` 命令的 -u和-f参数

在 Git 中，`-u` 和 `-f` 是 `git push` 命令的两个参数。

- `-u` 是 `--set-upstream` 的简写。当你推送一个分支到远程仓库时，使用 `-u` 参数会设置这个远程分支为你本地分支的上游（或跟踪）分支。这意味着在未来，你可以简单地使用 `git pull` 或 `git push` 命令，而不需要指定远程仓库或分支。这个参数通常在你第一次推送一个新的本地分支到远程仓库时使用。

- `-f` 是 `--force` 的简写。使用 `-f` 参数会强制 Git 推送你的本地分支到远程仓库，即使这会导致远程仓库中的一些提交被覆盖。这个参数应该谨慎使用，因为它可能会导致数据丢失。你可能会在你需要覆盖远程仓库中的提交，例如当你需要撤销一些错误的提交时，使用这个参数。

如，你可能需要使用 `git push -u -f origin master` 命令，将你的本地 `master` 分支的更改推送到 `origin` 远程仓库，并覆盖远程仓库中的任何冲突更改：

- `git push`：这是 Git 的一个命令，用于将本地仓库的更改推送到远程仓库。
- `origin`：这是远程仓库的名称。在大多数情况下，`origin` 是默认的远程仓库名称。
- `master`：这是你想要推送的本地分支的名称。

# git rebase (git变基，整理提交历史)

## git  rebase 释意

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

## 实际场景

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

## 终止 git rebase

## 如果你想在解决冲突的过程中终止git rebase，你可以使用`git rebase --abort`命令。

这将停止rebase过程并将你的分支回滚到rebase开始之前的状态。这是你的命令：

```bash
git rebase --abort
```

这将终止rebase过程并将你的分支恢复到rebase开始之前的状态。


## 如果你已经解决了一些冲突并且已经提交了这些更改，那么你需要先找到你开始rebase之前的提交点。你可以使用git reflog命令来查看你的git历史，找到你开始rebase之前的提交点的哈希值。

一旦你找到了这个哈希值，你可以使用`git reset --hard <hash>`命令来回滚到那个提交点。这将撤销所有你在那个提交点之后做的更改，包括你解决冲突的更改。

这是你的命令：
```bash
git reflog
# 找到你开始rebase之前的提交点的哈希值 
git reset --hard <hash>
```
请注意，`git reset --hard <hash>`是一个危险的命令，它会永久地删除你在那个提交点之后做的所有更改。在你运行这个命令之前，确保你没有未提交的更改，或者你已经备份了你的更改。

这个命令会忽略`pull.rebase`的设置，强制使用合并。


## 如果你想通过图形界面或者配置文件来查看Git的配置，你可以按照以下的步骤：

图形界面：如果你使用的是图形界面的Git客户端，如GitHub Desktop或者SourceTree，你可以在设置或者选项菜单中找到Git的配置。具体的位置可能会因为不同的客户端而有所不同。

配置文件：Git的配置存储在几个配置文件中。你可以直接打开这些文件来查看配置：

1. 系统级别的配置存储在Git安装目录下的etc/gitconfig文件中。
2. 用户级别的配置存储在用户主目录下的.gitconfig文件中。
3. 仓库级别的配置存储在仓库目录下的.git/config文件中。（Mac可用`Command + Shift + .`快捷键显示或隐藏文件）
在这些文件中，你可以查找pull.rebase的设置。如果这个设置存在，并且设置为true，那么git pull会默认使用变基。

# git reflog 显示了Git的历史记录，包括所有的提交、合并、检出等操作

`git reflog` 是一个非常有用的命令，它显示了Git的历史记录，包括所有的提交、合并、检出（通常指的是git checkout命令）等操作。每当HEAD或者分支引用被移动，Git都会在引用日志中添加一个新的条目。这意味着即使你进行了硬重置或者进行了一些可能丢失提交的操作，你仍然可以通过`git reflog`找到这些提交。

`git reflog`的输出类似于git log，但是它显示的是所有的引用变动，而不仅仅是新的提交。每一行都显示了一个引用变动，包括哈希值、HEAD的相对位置、操作的描述等。

例如，如果你运行`git reflog`，你可能会看到类似于下面的输出：

`e5e7a4b (HEAD -> main, origin/main, origin/HEAD) HEAD@{0}: commit: initial commit`

这表示最近的引用变动是一个新的提交，提交的哈希值是e5e7a4b，提交的描述是"initial commit"。`HEAD@{0}`表示这是最近的引用变动。

如果你不小心丢失了一些提交，你可以使用`git reflog`找到这些提交，然后使用`git checkout <hash>`或者`git reset --hard <hash>`恢复这些提交。

# git checkout 切换分支和恢复工作目录文件

`git checkout`命令，主要用于切换分支和恢复工作目录文件。

1. **切换分支**：当你执行`git checkout <branch>`时，Git会更新工作目录以匹配指定分支的快照，并更新HEAD以指向该分支。例如，如果你有一个名为`feature`的分支，并且你想切换到这个分支，你可以运行`git checkout feature`。

2. **创建并切换到新分支**：你可以使用`git checkout -b <new-branch>`来创建一个新的分支并立即切换到它。这等同于运行`git branch <new-branch>`和`git checkout <new-branch>`。

3. **恢复工作目录文件**：`git checkout`也可以用于恢复工作目录的文件。例如，如果你修改了一个文件，但是你想撤销这些修改，你可以运行`git checkout -- <file>`。这将会恢复该文件到最近一次提交的状态。

4. **检出特定的提交**：你也可以使用`git checkout <commit>`来检出特定的提交。这将会使得你的工作目录匹配该提交的状态。这在你想要查看或测试旧版本的代码时非常有用。

需要注意的是，`git checkout`会改变你的工作目录，如果你有未提交的更改，它们可能会被覆盖。在使用`git checkout`之前，确保你的工作目录是干净的，或者你已经提交了所有的更改。

# git stash 临时保存你的工作进度

 `git stash`命令，它允许你临时保存你的工作进度，这样你就可以在不提交更改的情况下切换到其他分支。

`git stash`它允许你在不同的分支之间切换，而不需要提交你的工作。这在你需要临时切换到其他分支，但不想提交你当前的工作时非常有用。

以下是`git stash`的一些常见用法：

1. **保存工作进度**：你可以使用`git stash`命令来保存你的工作进度。这将会保存你的修改和暂存的更改，并将工作目录恢复到最近一次提交的状态。你可以使用`git stash save "message"`来给你的储藏添加一个描述性的消息。

2. **查看储藏列表**：你可以使用`git stash list`命令来查看你的储藏列表。每个储藏都有一个名字，如`stash@{0}`，和一个描述。

3. **应用储藏**：你可以使用`git stash apply`命令来应用你的最新的储藏。这将会重新应用你储藏的更改，但不会从储藏列表中删除储藏。如果你想应用一个特定的储藏，你可以使用`git stash apply stash@{n}`。

4. **弹出储藏**：你可以使用`git stash pop`命令来应用你的最新的储藏，并从储藏列表中删除它。如果你想弹出一个特定的储藏，你可以使用`git stash pop stash@{n}`。

5. **删除储藏**：你可以使用`git stash drop stash@{n}`命令来删除一个特定的储藏。

6. **清空储藏列表**：你可以使用`git stash clear`命令来清空你的储藏列表。

**tips：** `git stash pop` 命令等价于 `git stash apply` 和 `git stash drop` 两个命令的组合。

具体来说，`git stash pop` 命令会做以下两件事：

1. 使用 `git stash apply` 命令将保存的更改应用到工作区。这不会删除 stash，所以你可以多次应用同一个 stash。

2. 使用 `git stash drop` 命令删除应用过的 stash。这样，stash 就不会再占用任何空间。

所以，如果你执行 `git stash pop`，然后立即执行 `git stash list`，你会发现应用过的 stash 已经被删除。


当你执行 `git stash pop stash@{2}` 命令时，Git 会做两件事：

1. 将 `stash@{2}` 中保存的更改应用到当前的工作区。如果这些更改与你当前的工作区有冲突，Git 会提示你解决这些冲突。

2. 如果更改被成功应用，那么 `stash@{2}` 将被从 stash 列表中删除。

因此，stash 列表会有以下的变化：

- 原来的 `stash@{2}` 将被删除。
- 原来的 `stash@{3}` 将变成新的 `stash@{2}`，原来的 `stash@{4}` 将变成新的 `stash@{3}`，以此类推。

你可以使用 `git stash list` 命令查看这些变化。

在 `git stash pop stash@{2}`这个命令中，`stash@{2}` 是你想要恢复的 stash 的名称。`stash@{0}` 表示最近的 stash，`stash@{1}` 表示次近的 stash，以此类推。

# git revert 和 git reset 使用Git撤销已提交的更改

`git revert` 和 `git reset` 都是用于撤销更改的命令，但它们的工作方式有所不同。

1. `git revert`：这个命令用于撤销指定的提交。它会创建一个新的提交，这个提交的内容与要撤销的提交相反。也就是说，如果要撤销的提交中添加了某些内容，那么新的提交就会删除这些内容；如果要撤销的提交中删除了某些内容，那么新的提交就会添加这些内容。这样做的好处是，它不会改变项目的提交历史。

2. `git reset`：这个命令用于将 HEAD 指针（也就是当前分支的指针）移动到指定的提交，然后丢弃所有在这个提交之后的更改。这样做的结果是，项目的提交历史会被改变。`git reset` 有三种模式：`--soft`、`--mixed` 和 `--hard`。`--soft` 模式只移动 HEAD 指针，不改变暂存区和工作区；`--mixed` 模式移动 HEAD 指针，并且重置暂存区，但不改变工作区；`--hard` 模式移动 HEAD 指针，并且重置暂存区和工作区。

 `git reset` 命令的默认参数是 `--mixed`。
这意味着，如果你只是运行 `git reset HEAD~1`（没有指定 `--soft`、`--mixed` 或 `--hard`），Git 将执行一个 "mixed" 类型的 reset。在 "mixed" 类型的 reset 中，Git 会撤销上一个 commit，但保留所做的更改（即，更改会被放回到工作区，不在暂存区）。这样你可以重新添加和提交这些更改。

如果你想撤销上一个 commit 的信息，但保留所做的更改（即，更改会被放回到暂存区），你可以使用 `git reset --soft HEAD~1` 命令。这里的 `HEAD~1` 表示"上一个 commit"。

```bash
git reset --soft HEAD~1
```

执行这个命令后，你的更改将被放回到暂存区，你可以使用 `git commit` 命令再次提交，并提供新的 commit 信息。

如果你想完全撤销上一个 commit（包括更改和 commit 信息），你可以使用 `git reset --hard HEAD~1` 命令。但请注意，这将永久删除上一个 commit 的更改，除非你有一个备份，否则无法恢复。

```bash
git reset --hard HEAD~1
```

总的来说，如果你想要撤销某个提交，但是不想改变项目的提交历史，那么应该使用 `git revert`。如果你想要丢弃某个提交，并且不介意改变项目的提交历史，那么应该使用 `git reset`。

## `git revert` 和 `git reset` 的具体用法如下：

```bash
# git revert 命令：
git revert HEAD //撤销最近的一次提交 
git revert HEAD~1 //撤销倒数第二次的提交
git revert abc123 //撤销特定的一次提交,commit ID 是 abc123,可以用git log 命令得到commit ID

# git reset 命令：
git reset --soft HEAD~1 //将 HEAD 指针移动到倒数第二次的提交，但不改变暂存区和工作区
git reset --mixed HEAD~1 //将 HEAD 指针移动到倒数第二次的提交，并且重置暂存区，但不改变工作区
git reset --hard HEAD~1 //将 HEAD 指针移动到倒数第二次的提交，并且重置暂存区和工作区

git reset --soft abc123 //将 HEAD 指针移动到特定的一次提交，但不改变暂存区和工作区，commit ID 是 abc123
git reset --mixed abc123 //将 HEAD 指针移动到特定的一次提交，并且重置暂存区，但不改变工作区，commit ID 是 abc123
git reset --hard abc123 //将 HEAD 指针移动到特定的一次提交，并且重置暂存区和工作区，commit ID 是 abc123

```



# git log 查看提交历史

在Git中，你可以使用`git log`命令来查看提交历史。这个命令会列出所有的提交，最新的提交在最上面。

如果你想查看每个提交的详细信息，包括作者、日期和提交信息，你可以使用`git log --pretty=fuller`命令。

如果你想查看每个提交的更改，你可以使用`git log -p`命令。

如果你想查看每个提交的统计信息，比如每个提交修改了多少行代码，你可以使用`git log --stat`命令。

这是命令的示例：

```bash
git log
git log --pretty=fuller
git log -p
git log --stat
```

你可以在Git中查看文件的更改历史记录：使用`git log -p <file>`命令来查看指定文件的更改历史。这个命令会列出所有修改了这个文件的提交，并显示每个提交的更改。

例如，如果你想查看`index.vue`文件的更改历史，你可以运行以下命令：

```bash
git log -p index.vue
```

这个命令会显示`index.vue`文件的所有提交，以及每个提交的更改。每个提交的更改以diff的形式显示，可以看到每次更改添加或删除了哪些行。

在Git中，你可以使用`git log --follow <file>`命令来查看特定文件的提交历史。这个命令会列出所有修改了这个文件的提交。

例如，如果你想查看`index.vue`文件的提交历史，你可以运行以下命令：

```bash
git log --follow index.vue
```

这个命令会显示`index.vue`文件的所有提交，包括每个提交的作者、日期和提交信息。`--follow`选项可以让Git跟踪文件的重命名。

在Git中，你可以使用`git log <branch>`命令来查看特定分支的更改历史。这个命令会列出指定分支的所有提交，最新的提交在最上面。

例如，如果你想查看名为`feature`的分支的更改历史，你可以运行以下命令：

```bash
git log feature
```

这个命令会显示`feature`分支的所有提交，包括每个提交的作者、日期和提交信息。


# git diff 查看未暂存的更改

在Git中，你可以使用`git diff`命令来查看未暂存的更改。这个命令会显示所有修改过但还没有暂存的文件的更改。

如果你想查看已经暂存但还没有提交的更改，你可以使用`git diff --cached`命令。

这是命令的示例：

```bash
git diff
git diff --cached
```

# git show 查看特定提交的更改

 在Git中，你可以使用`git show <commit>`命令来查看特定提交的更改。这个命令会显示指定提交的详细信息，包括作者、日期、提交信息和更改。

例如，如果你想查看哈希值为`abc123`的提交的更改，你可以运行以下命令：

```bash
git show abc123
```

这个命令会显示`abc123`提交的所有更改。更改以diff的形式显示，可以看到这次提交添加或删除了哪些行。