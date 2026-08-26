export interface PreviewSourceState<TSource> {
  readonly active: boolean;
  readonly sourceUri: TSource | undefined;
}

export interface SourceUriLike {
  readonly scheme: string;
  readonly fsPath: string;
  toString(): string;
}

/**
 * Return the source for the only focused preview.
 *
 * Multiple active previews are treated as ambiguous instead of guessing which
 * one the user intended. An active preview without a rendered source is also
 * unresolved.
 */
export function resolveActivePreviewSource<TSource>(
  states: Iterable<PreviewSourceState<TSource>>,
): TSource | undefined {
  let activeState: PreviewSourceState<TSource> | undefined;

  for (const state of states) {
    if (!state.active) {
      continue;
    }
    if (activeState) {
      return undefined;
    }
    activeState = state;
  }

  return activeState?.sourceUri;
}

/**
 * Format a source URI without treating remote or virtual resources as local
 * filesystem paths.
 */
export function formatPreviewSourcePath(sourceUri: SourceUriLike): string {
  return sourceUri.scheme === 'file' ? sourceUri.fsPath : sourceUri.toString();
}
