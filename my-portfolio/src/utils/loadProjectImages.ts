// Import all project images at build time
const allImages = import.meta.glob("/src/assets/projects/**/*.{png,jpg,jpeg}", { eager: true });

export function loadProjectImages(folder: string): string[] {
  return Object.entries(allImages)
    .filter(([path]) => path.includes(`/src/assets/projects/${folder}/`))
    .map(([_, mod]: any) => mod.default);
}
