const INSTALL_SCRIPT = `#!/usr/bin/env bash
# ==============================================================================
# Arch Linux + Hyprland DotFiles Installer
# https://github.com/krreeshhh/DotFiles
# ==============================================================================
set -euo pipefail

BOLD='\\033[1m'
RED='\\033[0;31m'
GREEN='\\033[0;32m'
CYAN='\\033[0;36m'
YELLOW='\\033[1;33m'
NC='\\033[0m'

echo -e "\${BOLD}\${CYAN}==> Initializing Arch Linux + Hyprland DotFiles Setup...\${NC}"

# Pre-flight check: Arch Linux
if [ ! -f /etc/os-release ]; then
    echo -e "\${RED}[ERROR] Cannot detect Linux distribution. /etc/os-release not found.\${NC}"
    exit 1
fi

# shellcheck source=/dev/null
source /etc/os-release
if [[ "\${ID:-}" != "arch" && "\${ID_LIKE:-}" != *"arch"* ]]; then
    echo -e "\${RED}[ERROR] This installer is designed exclusively for Arch Linux (detected: \${NAME:-Unknown}).\${NC}"
    exit 1
fi

# Ensure git is available
if ! command -v git >/dev/null 2>&1; then
    echo -e "\${YELLOW}[WARN] Git is not installed. Installing base-devel and git via pacman...\${NC}"
    sudo pacman -S --needed --noconfirm base-devel git
fi

TARGET_DIR="\$HOME/Dotfiles"

if [ -d "\$TARGET_DIR/.git" ]; then
    echo -e "\${CYAN}==> Existing Dotfiles repository found. Pulling latest updates...\${NC}"
    git -C "\$TARGET_DIR" pull --ff-only || true
else
    echo -e "\${CYAN}==> Cloning DotFiles repository to \${TARGET_DIR}...\${NC}"
    git clone https://github.com/krreeshhh/DotFiles.git "\$TARGET_DIR"
fi

echo -e "\${GREEN}==> Repository ready. Handing off to automated installer...\${NC}\\n"
chmod +x "\$TARGET_DIR/install.sh"
if [ -e /dev/tty ]; then
    exec /usr/bin/env bash "\$TARGET_DIR/install.sh" "\$@" </dev/tty
else
    exec /usr/bin/env bash "\$TARGET_DIR/install.sh" "\$@"
fi
`;

export async function GET() {
  return new Response(INSTALL_SCRIPT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
