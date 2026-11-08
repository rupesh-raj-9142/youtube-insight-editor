<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Architecture

- The YouTube Studio analytics clone is a static single-route UI: screens live in `src/components/studio/` (shell, ui primitives, data, tabs) and are assembled in `src/routes/index.tsx` with local tab state. No backend, no data fetching — all report values are hardcoded to match the reference screenshots.
- Video thumbnails and the profile avatar are CDN assets; import the `.asset.json` pointer files in `src/components/studio/data.tsx` / `shell.tsx`, never copy binaries into the repo.
