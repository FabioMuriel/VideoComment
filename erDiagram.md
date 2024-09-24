```mermaid
erDiagram
    USER {
        string id PK
        string nombre
        string email
        date fecha_registro
    }
    VIDEO {
        string id PK
        string titulo
        string descripcion
        string url
        string id_usuario FK
    }
    COMMENT {
        string id PK
        string contenido
        date fecha_creacion
        string id_usuario FK
        string id_video FK
    }

    USER || -- o{ VIDEO : publishes
    USER ||--o{ COMMENT : writes
    VIDEO ||--o{ COMMENT : has

```

[![](https://mermaid.ink/img/pako:eNqNUstuwyAQ_BXEOf4Bro0rVVGaqml7shQR2Nir2Ky1QKvK8b-X1I5ayz5kL8DMALOPThqyIJUEXqMuWTeFEyne9_mr6Ib9NXxgdKVAK142M9RRc2SYwdBorP9QqwOIE5hKHxhKTCIayH5YPp7W-e7uPwOGWNMMtuANY2uQ3IyLXC88fog-akYSj5uJnYfddps_v91tyJAL4NDSYsaGQS-aWjAwZT_RwsTcvwZdLiLLBHVj7ZRo47FGX4GfiLIsSW75KPHFGG6K4eJMUunEy5VsgFMTbZqP3zIUMlTQQCFV2lrN50IWrk86HQPtv52RKnCElWSKZSXVSdc-nWJ7rcQ4XyPa_wDhRMFL?type=png)](https://mermaid.live/edit#pako:eNqNUstuwyAQ_BXEOf4Bro0rVVGaqml7shQR2Nir2Ky1QKvK8b-X1I5ayz5kL8DMALOPThqyIJUEXqMuWTeFEyne9_mr6Ib9NXxgdKVAK142M9RRc2SYwdBorP9QqwOIE5hKHxhKTCIayH5YPp7W-e7uPwOGWNMMtuANY2uQ3IyLXC88fog-akYSj5uJnYfddps_v91tyJAL4NDSYsaGQS-aWjAwZT_RwsTcvwZdLiLLBHVj7ZRo47FGX4GfiLIsSW75KPHFGG6K4eJMUunEy5VsgFMTbZqP3zIUMlTQQCFV2lrN50IWrk86HQPtv52RKnCElWSKZSXVSdc-nWJ7rcQ4XyPa_wDhRMFL)