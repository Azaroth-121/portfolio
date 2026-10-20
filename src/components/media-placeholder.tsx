/**
 * Marks where a screenshot or diagram should go in a case study. Renders
 * nothing on the public site — a "TODO" box reads as unfinished to a
 * visitor — so the reminders live only in the MDX source until the real
 * images are added.
 */
export function MediaPlaceholder(props: { label: string }) {
  void props;
  return null;
}
