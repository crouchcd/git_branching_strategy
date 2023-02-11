#!/usr/bin/env bash

missing=${{ steps.pr-checklist.outputs.missing }}
skipped=${{ steps.pr-checklist.outputs.skipped }}
found=${{ steps.pr-checklist.outputs.found }}
echo "::debug::missing: $missing"
echo "::debug::skipped: $skipped"
echo "::debug::found: $found"
echo "# PR Checklist" > pr_checklist_comment.md
echo "" >> pr_checklist_comment.md
function __printoutput() {
    filesin=$1
    emoji=$2
    phrase=$3
    arr=($(awk -F '__I__' '{
        for (i=0; ++i <= NF;)
        print $i
        }' <<< $filesin))
    for filename in "${arr[@]}"; do
        if [[ -z $filename ]]; then
        continue
        fi
        echo "- $emoji $phrase $filename" >> pr_checklist_comment.md
    done
}
__printoutput $missing ':x:' 'Missing'
__printoutput $skipped ':eyes:' 'Skipped'
__printoutput $found ':white_check_mark:' 'Found'
if [[ -n $missing ]]; then
    echo "::error::Missing required files $missing"
    exit 1
fi
