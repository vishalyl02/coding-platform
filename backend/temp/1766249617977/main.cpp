#include <iostream>
  #include <vector>
  #include <algorithm>
  using namespace std;
  


struct Tree {
    int height;
    int distance;
};

bool compareTrees(const Tree &a, const Tree &b) {
    // Rule 1: smaller distance first
    if (a.distance != b.distance)
        return a.distance < b.distance;

    // Rule 2: if distance same, taller first
    return a.height > b.height;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<Tree> trees(n);
    for (int i = 0; i < n; i++) {
        cin >> trees[i].height >> trees[i].distance;
    }

    sort(trees.begin(), trees.end(), compareTrees);

    for (const auto &t : trees) {
        cout << t.height << " " << t.distance << "\n";
    }

    return 0;
}


