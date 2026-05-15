import re
import json

def normalize_type(raw_type):
    rt = raw_type.lower()
    if 'hospital' in rt or 'clinic' in rt:
        return 'hospital'
    if 'lab' in rt or 'diagnostics' in rt:
        return 'lab'
    if 'counselling' in rt or 'education' in rt:
        return 'counselling'
    if 'support' in rt or 'group' in rt:
        return 'support'
    return 'hospital' # Default

def normalize_state(raw_state):
    # Remove text in parentheses: "Federal Capital Territory (Abuja)" -> "Federal Capital Territory"
    s = re.sub(r'\(.*?\)', '', raw_state).strip()
    # Remove "State" suffix if it exists: "Lagos State" -> "Lagos"
    if s.endswith(' State'):
        s = s.replace(' State', '').strip()
    # Manual map for abbreviations
    if s == 'FCT':
        return 'Federal Capital Territory'
    return s

def parse_md(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    providers = []
    countries = re.split(r'\n## ', content)[1:]
    
    for country_block in countries:
        lines = country_block.strip().split('\n')
        country_name = lines[0].split('(')[0].strip()
        
        states = re.split(r'\n### ', country_block)[1:]
        for state_block in states:
            lines = state_block.strip().split('\n')
            state_name = normalize_state(lines[0].strip())
            
            provider_blocks = re.split(r'\n#### ', state_block)[1:]
            for p_block in provider_blocks:
                p_lines = p_block.strip().split('\n')
                name = p_lines[0].strip()
                p_data = {
                    "name": name,
                    "country": country_name,
                    "state": state_name,
                    "verified": True
                }
                
                for line in p_lines[1:]:
                    if line.startswith('- **Type:**'):
                        p_data["type"] = normalize_type(line.replace('- **Type:**', '').strip())
                    elif line.startswith('- **Specialty:**'):
                        p_data["specialty"] = line.replace('- **Specialty:**', '').strip()
                    elif line.startswith('- **Hospital:**'):
                        p_data["hospital"] = line.replace('- **Hospital:**', '').strip()
                    elif line.startswith('- **Address:**'):
                        p_data["address"] = line.replace('- **Address:**', '').strip()
                    elif line.startswith('- **Phone:**'):
                        p_data["phone"] = line.replace('- **Phone:**', '').strip()
                    elif line.startswith('- **Email:**'):
                        p_data["email"] = line.replace('- **Email:**', '').strip()
                    elif line.startswith('- **Website:**'):
                        p_data["website"] = line.replace('- **Website:**', '').strip()
                    elif line.startswith('- **Services:**'):
                        services_str = line.replace('- **Services:**', '').strip()
                        p_data["services"] = [s.strip() for s in services_str.split(',')]
                
                if 'type' not in p_data:
                    p_data['type'] = 'hospital'
                
                providers.append(p_data)
                
    return providers

if __name__ == "__main__":
    providers = parse_md('c:/Users/User/Monorepo/hemora/public/provider-directory.md')
    
    prompt_providers = [
        {
            "name": "Garki Hospital Sickle Cell Clinic",
            "type": "hospital",
            "phone": "+234-809-300-0011",
            "address": "Tafawa Balewa Way, Area 8, Garki, Abuja",
            "state": "Federal Capital Territory",
            "country": "Nigeria",
            "verified": True,
            "services": ["sickle cell clinic"]
        },
        {
            "name": "SAMI (Sickle Cell Aid Foundation)",
            "type": "support",
            "phone": "+234-802-311-6666",
            "address": "13A, Suleiman Crescent, Off Anthony Enahoro St, Utako, Abuja",
            "state": "Federal Capital Territory",
            "country": "Nigeria",
            "verified": True,
            "services": ["support group", "advocacy"]
        },
        {
            "name": "Mulago National Referral Hospital",
            "type": "hospital",
            "phone": "+256-414-554001",
            "address": "Mulago Hill, Kampala",
            "state": "Kampala",
            "country": "Uganda",
            "verified": True,
            "services": ["sickle cell clinic", "haematology"]
        },
        {
            "name": "Uganda Sickle Cell Rescue Foundation",
            "type": "support",
            "phone": "+256-772-400000",
            "address": "Plot 25, Gaba Rd, Kampala",
            "state": "Kampala",
            "country": "Uganda",
            "verified": True,
            "services": ["support group", "advocacy"]
        }
    ]
    
    existing_names = {p['name'].lower() for p in providers}
    for pp in prompt_providers:
        if pp['name'].lower() not in existing_names:
            providers.append(pp)

    with open('c:/Users/User/Monorepo/hemora/scratch/providers_seed.json', 'w', encoding='utf-8') as f:
        json.dump(providers, f, indent=2)
    
    print(f"Successfully extracted {len(providers)} providers with normalized states.")
