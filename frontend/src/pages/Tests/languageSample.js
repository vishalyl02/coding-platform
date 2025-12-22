const CPP_TEMPLATE = `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Write your solution here
    return 0;
}`;

const JAVA_TEMPLATE = `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Write your solution here
    }
}`;

const PYTHON_TEMPLATE = `# Write your solution here

def main():
    pass

if __name__ == "__main__":
    main()`;

export const languageSample = {
  cpp: CPP_TEMPLATE,
  java: JAVA_TEMPLATE,
  python: PYTHON_TEMPLATE
};