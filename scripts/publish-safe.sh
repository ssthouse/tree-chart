#!/bin/bash
# Safe publish script that skips if version already exists
npm publish 2>&1 | tee /tmp/npm-publish-$$.log
EXIT_CODE=${PIPESTATUS[0]}

if [ $EXIT_CODE -ne 0 ]; then
  if grep -q "previously published" /tmp/npm-publish-$$.log || grep -q "You cannot publish over" /tmp/npm-publish-$$.log; then
    echo "⚠️  Version already published, skipping..."
    rm -f /tmp/npm-publish-$$.log
    exit 0
  else
    echo "❌ Publish failed with error:"
    cat /tmp/npm-publish-$$.log
    rm -f /tmp/npm-publish-$$.log
    exit $EXIT_CODE
  fi
fi

rm -f /tmp/npm-publish-$$.log
exit 0

