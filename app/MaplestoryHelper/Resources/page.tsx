"use client";

import './page.css';
import { tools } from './tools';
import { general } from './general';
import { classInfo } from './classInfo';

function TableIcon({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return <div className="w-6 h-6 mx-auto rounded-md" aria-hidden="true" />
  }
  return (
    <div className="w-6 h-6 mx-auto flex items-center justify-center overflow-hidden rounded-md">
      <img 
        src={src}
        alt={alt}
        width={24}
        height={24}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}

export default function Resources() {
  return (
    <section id="resourcesPage">
      <div className="panel shadow inline-flex flex-wrap flex-col resourcesPage">
        <h1 className="">Tools</h1>
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>Link</th>
            </tr>            
          </thead>
          <tbody>
            {tools.map((tool) => (
              <tr key={tool.name}>
                <td>
                  <TableIcon src={tool.image} alt={`${tool.name} icon`} />
                </td>
                <td>{tool.name}</td>
                <td>{tool.description}</td>
                <td>{tool.author}</td>
                <td>{tool.link ? <a target="_blank" href={tool.link}>Link</a> : null}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 className="pt-5">General Information</h1>
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>Category</th>
              <th>Link</th>
            </tr>            
          </thead>
          <tbody>
            {general.map((general) => (
              <tr key={general.name}>
                <td>
                  <TableIcon src={general.image} alt={`${general.name} icon`} />
                </td>
                <td>{general.name}</td>
                <td>{general.description}</td>
                <td>{general.authorLink ? <a target="_blank" href={general.authorLink}>{general.author}</a> : general.author}</td>
                <td>{general.category}</td>
                <td>{general.link ? <a target="_blank" href={general.link}>Link</a> : null}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 className="pt-5">Class Information</h1>
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Class</th>
              <th>Guide</th>
              <th>Discord</th>
              <th>Hexa</th>
              <th>Last Updated</th>
            </tr>            
          </thead>
          <tbody>
            {classInfo.map((classInfo) => (
              <tr key={classInfo.name}>
                <td>
                  <TableIcon src={classInfo.image} alt={`${classInfo.name} icon`} />
                </td>
                <td>{classInfo.name}</td>
                <td className='text-center'>{classInfo.guide ? <a target="_blank" href={classInfo.guide}>Link</a> : null}</td>
                <td className='text-center'>{classInfo.discord ? <a target="_blank" href={classInfo.discord}>Link</a> : null}</td>
                <td className='text-center'>{classInfo.hexa ? <a target="_blank" href={classInfo.hexa}>Link</a> : null}</td>
                <td className='text-center'>{classInfo.lastUpdated ? classInfo.lastUpdated : null}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}